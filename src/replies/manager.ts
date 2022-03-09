interface ReplyRule {
  keywords: string[];
  reply: string;
}

class ReplyManager {
  #rules: ReplyRule[];

  constructor(rules: Iterable<ReplyRule>) {
    this.#rules = [...rules];
  }

  getAll(content: string) {
    return this.#rules.flatMap((rule) => {
      const repeats = rule.keywords.filter((keyword) =>
        content.includes(keyword)
      ).length;
      return new Array<string>(repeats).fill(rule.reply);
    });
  }
}

const manager = new ReplyManager([
  {
    keywords: ['きつね', '狐', 'こやん', 'こやーん', 'くやーん', 'こゃーん'],
    reply: '(^・ω・^)ノ こやーん',
  },
  {
    keywords: [
      'お疲れ様です',
      'おつかれさま',
      'おつです',
      'otudesu',
      ':Otsu_desu:',
      '落ちます',
    ],
    reply: '(^・ω・^)ノ こやーん(おつかれさまです)',
  },
  {
    keywords: ['うお', 'うおうお'],
    reply: '(^・ω・^)ノ こやーん(うおうお)',
  },
  {
    keywords: ['こんばんは'],
    reply: '(^・ω・^)ノ こやーん(こんばんは)',
  },
  {
    keywords: ['こんにちは'],
    reply: '(^・ω・^)ノ こやーん(こんにちは)',
  },
  {
    keywords: ['疲れた', 'つかれた'],
    reply: '(^・ω・^)ノ こやーん(がんばれ！！)',
  },
  {
    keywords: [
      'すごい',
      'sugoi',
      ':wakaru:',
      ':sugoi:',
      ':onaji:',
      ':wakarimi:',
      'SUGOI',
    ],
    reply: '(^・ω・^)ノ こやーん(わかる)',
  },
  {
    keywords: [':usagi:', 'うさぎになりたい', 'うさぎ', 'ねこ', 'にゃん'],
    reply: '(^・ω・^)ノ こやーん(狐じゃい)',
  },
  {
    keywords: [':mogu:', 'ご飯', 'ごはん', 'もぐもぐ', 'mogumogu'],
    reply: '(^・ω・^)ノ むしゃむしゃ',
  },
  {
    keywords: ['きつねうどん'],
    reply: '```diff\n-(^・ω・^)人間滅ぼすぞ...```',
  },
]);

export default manager;
