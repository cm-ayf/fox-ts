import { sha256 } from 'crypto-hash';
import { Fortune } from '.';

class FortuneManager {
  #ranks;
  #luckyItems;
  #keywords;

  static getMathRandomFromArray<T>(set: T[]) {
    const i = set.length * Math.random();
    return [...set][i];
  }

  static async getHashRandomFromArray<T>(set: T[], id: string) {
    const hash = await sha256(`${id} ${new Date().toDateString()}`);
    return [...set][parseInt(hash.slice(0, 12), 16) % set.length];
  }

  constructor(ranks: string[], luckyItems: string[], keywords: string[]) {
    this.#ranks = ranks;
    this.#luckyItems = luckyItems;
    this.#keywords = keywords;
  }

  async getRandom(id?: string): Promise<Fortune> {
    if (id) {
      const [rank, luckyItem, keyword] = await Promise.all([
        FortuneManager.getHashRandomFromArray(this.#ranks, id),
        FortuneManager.getHashRandomFromArray(this.#luckyItems, id),
        FortuneManager.getHashRandomFromArray(this.#keywords, id),
      ]);
      return { rank, luckyItem, keyword };
    } else {
      return {
        rank: FortuneManager.getMathRandomFromArray(this.#ranks),
        luckyItem: FortuneManager.getMathRandomFromArray(this.#luckyItems),
        keyword: FortuneManager.getMathRandomFromArray(this.#keywords),
      };
    }
  }
}

export const manager = new FortuneManager(
  [
    '大吉',
    '中吉',
    '小吉',
    '吉',
    '凶',
    '大凶',
    '大吉',
    '中吉',
    '小吉',
    '吉',
    '凶',
    '大凶',
    '大吉',
    '中吉',
    '小吉',
    '吉',
    '凶',
    '大凶',
    '大吉',
    '中吉',
    '小吉',
    '吉',
    '大大吉',
    '凶',
    '大凶',
    '大吉',
    '中吉',
    '小吉',
    '吉',
    '凶',
    '大凶',
    '大大吉',
    '区',
    'うな重',
    'おみくじ',
    'もう1回引けるドン',
    'コ',
    '匚',
    '𠮷',
    '大𠮷',
    '羊吉🐏',
  ],
  [
    'お菓子',
    'ハンカチ',
    'ポケットティッシュ',
    '小説',
    'ダンボール',
    '専門書',
    '専門書',
    'うな重',
    'きつねうどん',
    '自転車',
    'スズメ',
    '光子',
  ],
  [
    '車両運搬具減価償却累計額',
    'クロスエントロピー',
    'Höchst-Wacker process(ヘキストワッカー法) ',
    'divD=ρ',
    'ボース-アインシュタイン凝縮',
    'ノーフリーランチ定理',
    'Ramseyの定理',
    'ディレトリトラバーサル',
    '表現型の可塑性',
    'ロトカ・ヴォルテラの方程式',
    'グラフェン',
    'ニコルソン・ベイリーモデル',
    'P=ρRT',
    'シンプソンの多様度指数',
    'クーパートリプル',
    'ラジアルブリージングモード',
    'ポテンシャル温度',
    '群書類従',
    'リード＝シュテルンベルグ細胞',
    'コードスイッチング',
    '双子語',
    '口笛言語',
    'マカロネシア',
    'ヒプナゴジア',
    'Diels-Alder reaction',
    '頭内爆発音症候群',
    'タキサン',
    '沸石',
    '月のナトリウム尾',
    'x86_64',
    'マクスウェル山',
    'arm',
  ]
);
