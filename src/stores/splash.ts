import { atom } from "nanostores";

const $splash = atom<"" | "restart" | "win" | "tie" | "next">("");

export { $splash };
