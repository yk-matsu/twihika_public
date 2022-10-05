import { flat } from './util';

describe('flat function unit', () => {
  test('一次元の配列に変更がないこと', async () => {
    expect(flat(["foo", "bar", "buz"])).toStrictEqual(["foo", "bar", "buz"]);
  });

  test('2次元配列はが一次元の配列に展開されること', async () => {
    expect(flat([["foo", "bar", "buz"]])).toStrictEqual(["foo", "bar", "buz"]);
    expect(flat([["foo", "bar", "buz"], ["foo", "bar", "buz"]])).toStrictEqual(["foo", "bar", "buz", "foo", "bar", "buz"]);
  });

  test('3次元配列は2次元配列に展開されること', async () => {
    expect(flat([[["foo", "bar", "buz"]]])).toStrictEqual([["foo", "bar", "buz"]]);
    expect(flat([[["foo", "bar", "buz"], ["foo", "bar", "buz"]]])).toStrictEqual([["foo", "bar", "buz"], ["foo", "bar", "buz"]]);
  });
})