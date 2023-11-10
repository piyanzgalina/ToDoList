type GenerateId = () => string;
export const GenerateId: GenerateId = () => (
    Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
)