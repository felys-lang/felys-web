export const EN = `print("Language for", __elysia__);

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

export const ZH = `打印（“至”，——爱莉希雅——，“的语言”）；

阶跃函数 = ｜数｜「
    如果 数 小于 0「
        返回 0；
    」否如 数 等于 0「
        返回 0.5；
    」否则「
        返回 1；
    」
」；

结果 = 阶跃函数（0）；
打印（结果）；
`;
