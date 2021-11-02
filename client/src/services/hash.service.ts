import bcrypt from "bcrypt";

export const hash: any = async (password: string) => {
    return await bcrypt.hash(password, "DUMMY");
};
