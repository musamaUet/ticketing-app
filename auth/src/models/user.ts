import mongoose from 'mongoose';
import { Password } from '../services/password';
// An interface that describes the properties that are required a new User
interface UserAttributes {
	email: string;
	password: string;
}

// An interface that describes the properties that a UserModal has
interface UserModel extends mongoose.Model<UserDocument> {
	build(attributes: UserAttributes): UserDocument;
}

// An interface that describes the properties that a UserDocument has

interface UserDocument extends mongoose.Document {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	done();
});
userSchema.statics.build = (attributes: UserAttributes) => {
	return new User(attributes);
};

export { User };
