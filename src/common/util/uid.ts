export function uid(size: number = 32, base: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"): string {
  let len = base.length;
  let buf: string[] = [];
  for (let i = 0; i < size; i++)
    buf.push(base[Math.floor(Math.random() * len)]);
  return buf.join("");
}
