import mongoose from 'mongoose';
import crypto from "crypto"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your name"],
        trim: true,
        maxLength: [20, "Name can be max 20 chars long!"],
    },
    account: {
        type: String,
        required: [true, "Please add your email address or phone number"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add your password"],
        trim: true,
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/ruyisbaros/image/upload/v1667665010/mern-e-commerce/mioipdwcan4r6zm26x3j.png"
    },
    role: {
        type: String,
        enum: ["User", "Admin", "Co-host"],
        default: "User"
    },
    type: {
        type: String,
        default: "normal"
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);

    next();
});

userSchema.methods.isPasswordTrue = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};


//Forgot password
userSchema.methods.createResetToken = function () {
    //generate crypto token
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    //console.log({ resetToken }, this.resetPasswordToken);
    this.resetPasswordTime = Date.now() + 15 * 60 * 1000; //15 minutes

    return resetToken;
};

export default mongoose.model("User", userSchema)