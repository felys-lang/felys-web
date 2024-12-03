export const CODE = `whois = |name| if name == "Acheron" {
    "雷电·忘川守·芽衣"
} else if name == "Elysia" {
    "爱莉希雅"
} else "Unknown";

meet = |me, others| {
    (first, second) = others;
    me + ": Hi, " + first + " and " + second + "!"
}

name = whois("Acheron");
greeting = meet("FelysNeko", (__elysia__, name));

return greeting;
`;
