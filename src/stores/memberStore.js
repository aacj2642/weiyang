import { defineStore } from 'pinia';

// 樂團職位 badge 統一樣式
export const positionBadgeStyle = { color: '#f0c040', bg: 'rgba(240, 192, 64, 0.15)' };

export const useMemberStore = defineStore('member', {
  state: () => ({
    memberCategories: [
      {
        name: "吹管組",
        members: [
          { id: "1", name: "張維明", role: "梆笛 / 曲笛", positions: ["團長"], description: "張維明是一位才華橫溢的笛子演奏家，擁有豐富的演出經驗。演奏風格細膩動人，技巧純熟，擅長詮釋各種風格的樂曲。" },
          { id: "2", name: "李佳穎", role: "笙", positions: [], description: "李佳穎專精於笙的演奏，音色優美動聽。經常參與各大音樂節的演出，深受觀眾喜愛。" },
          { id: "3", name: "陳冠宇", role: "簫 / 嗩吶", positions: [], description: "陳冠宇擅長簫與嗩吶，演奏極具感染力。多次獲得國內外音樂比賽大獎，是樂團中不可或缺的成員。" }
        ]
      },
      {
        name: "拉弦組",
        members: [
          { id: "4", name: "林志豪", role: "二胡", positions: ["首席"], description: "林志豪的二胡演奏技巧高超，琴音悠揚。曾多次舉辦個人獨奏會，深獲樂評人高度讚賞。" },
          { id: "5", name: "王心妍", role: "二胡", positions: [], description: "王心妍的演奏風格溫婉細膩，充滿情感。她致力於推廣傳統音樂，並積極參與跨界演出。" },
          { id: "6", name: "吳宗翰", role: "中胡", positions: [], description: "吳宗翰在中胡的演奏上展現了極高的造詣，音色渾厚。他是樂團中的中堅力量，深受團員敬重。" }
        ]
      },
      {
        name: "彈撥組",
        members: [
          { id: "7", name: "劉詩婷", role: "琵琶", positions: [], description: "劉詩婷的琵琶演奏技巧精湛，音色清脆。她經常在各大音樂會中擔任獨奏，廣受好評。" },
          { id: "8", name: "黃俊傑", role: "揚琴", positions: [], description: "黃俊傑擅長揚琴演奏，節奏感強烈。他的演奏充滿活力，為樂團帶來了豐富的音樂表現力。" },
          { id: "9", name: "趙麗華", role: "中阮 / 柳琴", positions: [], description: "趙麗華在中阮與柳琴的演奏上都有出色的表現。她的音樂風格多變，能夠詮釋各種不同類型的樂曲。" },
          { id: "10", name: "謝孟霖", role: "古箏 / 打擊", positions: [], description: "兼樂團打擊和古箏" }
        ]
      },
      {
        name: "低音組",
        members: [
          { id: "11", name: "許哲銘", role: "大提琴", positions: [], description: "許哲銘的大提琴演奏音色溫暖，充滿感情。他在樂團中扮演著重要的角色，為音樂增添了厚實的低音。" },
          { id: "12", name: "鄭怡君", role: "低音提琴", positions: [], description: "鄭怡君的低音提琴演奏穩健有力，節奏精準。她的演奏為樂團提供了堅實的基礎，是不可或缺的成員。" }
        ]
      },
      {
        name: "擊樂組",
        members: [
          { id: "13", name: "吳亭亭", role: "排鼓 / 定音鼓", positions: [], description: "吳亭亭在打擊樂器的演奏上充滿了激情與張力。她的節奏感極佳，能夠帶動整個樂團的情緒。" },
          { id: "14", name: "謝子安", role: "各種打擊樂器", positions: [], description: "謝子安擅長各種打擊樂器，技巧全面。他的演奏充滿了創造力，為樂團的音樂增添了豐富的色彩。" }
        ]
      },
      {
        name: "行政人員",
        members: [
          { id: "15", name: "陳美玲", role: "行政管理", positions: ["行政總監"], description: "陳美玲負責樂團的行政管理工作，統籌各項事務，確保樂團運作順暢。" },
          { id: "16", name: "林家豪", role: "樂務管理", positions: ["樂管"], description: "林家豪負責樂團的樂務管理，包括排練安排、樂譜管理及演出協調等工作。" },
          { id: "17", name: "王志偉", role: "資訊管理", positions: ["資訊"], description: "王志偉負責樂團的資訊系統維護與網站管理，確保樂團的數位化運作。" }
        ]
      }
    ].map(category => ({
      ...category,
      members: category.members.map(member => ({
        ...member,
        positions: member.positions || [],
        avatar: `${import.meta.env.BASE_URL}member/${member.id}/avatar.jpg`,
        artisticPhoto: `${import.meta.env.BASE_URL}member/${member.id}/art.jpg`
      }))
    }))
  }),
  getters: {
    allCategories: (state) => {
      const allMembersCategory = {
        name: "樂團成員",
        members: state.memberCategories.reduce((acc, category) => {
          return acc.concat(category.members);
        }, [])
      };
      return [allMembersCategory, ...state.memberCategories];
    },
    getMemberById: (state) => {
      return (id) => {
        for (const category of state.memberCategories) {
          const member = category.members.find(m => m.id === String(id));
          if (member) return member;
        }
        return null;
      }
    }
  }
});
