export const sanatizeText = (input) => {
    if (!input) return '';
    
    // Remove script tags and their content
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').trim();
};