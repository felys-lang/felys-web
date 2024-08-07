export const EN = `print("Language for", __elysia__);

ilove = |episode| {
    if episode == none {
        print("I'm not a weeb");
        return none;
    }

    counter = 0;
    while counter < 3 {
        print("Favourite episode is:", episode);
        counter += 1;
    }
};


episode = "Because of You";
ilove(episode);
`;

export const ZH = `打印（“至”，——爱莉希雅——，“的语言”）；

超喜欢 = ｜集数｜「
    如果 集数 等于 无「
        打印（“我不是二次元”）；
        返回 无；
    」

    计数器 = 0；
    当 计数器 小于 3「
        打印（“最喜欢的一集：”，集数）；
        计数器 += 1；
    」
」；

短片名 = “因你而在的故事”；
超喜欢（短片名）；
`;
