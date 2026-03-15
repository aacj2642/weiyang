<template>
  <div class="member-page">
    <div class="container">
      <h2 class="text-center mb-5 category-title fw-bold">成員介紹</h2>
      
      <!-- Category Tabs -->
      <ul class="nav nav-pills justify-content-center mb-5" id="member-tab" role="tablist">
        <li class="nav-item" role="presentation" v-for="(category, index) in allCategories" :key="category.name">
          <button class="nav-link fs-5" :class="{ active: index === 0 }" :id="'tab-' + index" data-bs-toggle="pill" :data-bs-target="'#content-' + index" type="button" role="tab" :aria-controls="'content-' + index" :aria-selected="index === 0 ? 'true' : 'false'">
            {{ category.name }}
          </button>
        </li>
      </ul>

      <!-- Category Content -->
      <div class="tab-content" id="member-tabContent">
        <div class="tab-pane fade" :class="{ 'show active': index === 0 }" :id="'content-' + index" role="tabpanel" :aria-labelledby="'tab-' + index" tabindex="0" v-for="(category, index) in allCategories" :key="category.name">
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
            <div class="col" v-for="member in category.members" :key="member.name">
              <div class="card h-100 text-center border-0 bg-transparent">
                <div class="avatar-wrapper mx-auto mb-3 shadow-sm text-light">
                  <!-- 1:1 Avatar -->
                  <img :src="member.avatar" class="w-100 h-100 object-fit-cover text-white-50" :alt="member.name">
                </div>
                <div class="card-body p-0">
                  <h4 class="card-title fw-bold mb-2 member-name-text">{{ member.name }}</h4>
                  <p class="card-text fs-6 member-role-text">{{ member.role }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MemberView",
  data() {
    return {
      // Mock data for Chinese traditional music sizing ensemble
      memberCategories: [
        {
          name: "吹管組",
          members: [
            { name: "張維明", role: "梆笛 / 曲笛", avatar: "https://fakeimg.pl/400x400/8c9b9a/ffffff?text=吹管&font=noto" },
            { name: "李佳穎", role: "笙", avatar: "https://fakeimg.pl/400x400/8c9b9a/ffffff?text=吹管&font=noto" },
            { name: "陳冠宇", role: "簫 / 嗩吶", avatar: "https://fakeimg.pl/400x400/8c9b9a/ffffff?text=吹管&font=noto" }
          ]
        },
        {
          name: "拉弦組",
          members: [
            { name: "林志豪", role: "二胡", avatar: "https://fakeimg.pl/400x400/7a8e8b/ffffff?text=拉弦&font=noto" },
            { name: "王心妍", role: "二胡", avatar: "https://fakeimg.pl/400x400/7a8e8b/ffffff?text=拉弦&font=noto" },
            { name: "吳宗翰", role: "中胡", avatar: "https://fakeimg.pl/400x400/7a8e8b/ffffff?text=拉弦&font=noto" }
          ]
        },
        {
          name: "彈撥組",
          members: [
            { name: "劉詩婷", role: "琵琶", avatar: "https://fakeimg.pl/400x400/69827e/ffffff?text=彈撥&font=noto" },
            { name: "黃俊傑", role: "揚琴", avatar: "https://fakeimg.pl/400x400/69827e/ffffff?text=彈撥&font=noto" },
            { name: "趙麗華", role: "中阮 / 柳琴", avatar: "https://fakeimg.pl/400x400/69827e/ffffff?text=彈撥&font=noto" },
            { name: "周家威", role: "古箏", avatar: "https://fakeimg.pl/400x400/69827e/ffffff?text=彈撥&font=noto" }
          ]
        },
        {
          name: "低音組",
          members: [
            { name: "許哲銘", role: "大提琴", avatar: "https://fakeimg.pl/400x400/587570/ffffff?text=低音&font=noto" },
            { name: "鄭怡君", role: "低音提琴", avatar: "https://fakeimg.pl/400x400/587570/ffffff?text=低音&font=noto" }
          ]
        },
        {
          name: "擊樂組",
          members: [
            { name: "吳亭亭", role: "排鼓 / 定音鼓", avatar: "https://fakeimg.pl/400x400/476963/ffffff?text=擊樂&font=noto" },
            { name: "謝子安", role: "各種打擊樂器", avatar: "https://fakeimg.pl/400x400/476963/ffffff?text=擊樂&font=noto" }
          ]
        }
      ]
    };
  },
  computed: {
    allCategories() {
      // Create 'All Members' category
      const allMembersCategory = {
        name: "樂團成員",
        members: this.memberCategories.reduce((acc, category) => {
          return acc.concat(category.members);
        }, [])
      };
      
      return [allMembersCategory, ...this.memberCategories];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/customVariables";
.category-title {
  color: #ffffff !important;
  letter-spacing: 0.2rem;
}

.avatar-wrapper {
  width: 160px;
  height: 160px;
  border-radius: 50%; /* 1:1 circle */
  overflow: hidden;
  border: 4px solid #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
  }

  @media (min-width: map-get($grid-breakpoints, md)) {
    width: 200px;
    height: 200px;
  }
}

.object-fit-cover {
  object-fit: cover;
}

.member-name-text {
  color: #ffffff !important;
  letter-spacing: 0.1rem;
}

.member-role-text {
  color: rgba(255, 255, 255, 0.75) !important;
  letter-spacing: 0.05rem;
}

.nav-pills {
  .nav-link {
    color: rgba(255, 255, 255, 0.7) !important;
    border-radius: 50px;
    padding: 10px 24px;
    margin: 0 4px;
    transition: all 0.3s ease;
    
    &:hover {
      color: #fff !important;
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
    
    &.active {
      background-color: rgba(255, 255, 255, 0.2) !important;
      color: #fff !important;
      font-weight: bold;
    }
  }
}
</style>
