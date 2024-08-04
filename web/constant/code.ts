export const example = `print("Language for", __elysia__);

heaviside = |x| {
    if x < 0 {
        return 0;
    } elif x == 0 {
        return 0.5;
    } else {
        return 1;
    }
};

result = heaviside(0);
print(result);
`;