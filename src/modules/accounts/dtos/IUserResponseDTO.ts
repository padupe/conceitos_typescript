interface IUserResponseDTO {
    id: string;
    name: string;
    email: string;
    avatar: string;
    driver_license: string;
    getAvatarURL: string;
};

export { IUserResponseDTO };