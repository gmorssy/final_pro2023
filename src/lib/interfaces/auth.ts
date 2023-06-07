export type LoginResult =
    | { error: { code: number; data: any }; success?: undefined }
    | { error?: undefined; success: { session: string } };

export interface Auth {
    randomizer: UIDRandomizer;
    encrypter: Encrypter;
    login(form: FormData): Promise<LoginResult>;
}

export interface UIDRandomizer {
    generate_unique_id(): string;
}

export interface Encrypter {
    hash(password: string, salt: string): string;
}