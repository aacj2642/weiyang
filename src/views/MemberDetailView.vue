<template>
  <div class="member-detail-page py-5">
    <div class="container text-light mt-5">
      <div class="row align-items-start" v-if="member">
        <div class="col-md-5 text-center mb-4 mb-md-0">
          <div class="avatar-wrapper mx-auto shadow-lg">
            <img :src="member.artisticPhoto || member.avatar" @error="handleImageError"
              class="w-100 h-100 object-fit-cover" :alt="member.name">
          </div>
        </div>
        <div class="col-md-7 text-center text-md-start">
          <h2 class="fw-bold mb-3 member-name-text text-white">{{ member.name }}</h2>
          <div class="position-badges mb-3" v-if="member.positions && member.positions.length">
            <span v-for="pos in member.positions" :key="pos" class="badge rounded-pill me-1 position-badge"
              :style="badgeStyle">{{ pos }}</span>
          </div>
          <h4 class="mb-4 member-role-text text-white-50">{{ member.role }}</h4>
          <p class="fs-5 lh-lg my-4" style="white-space: pre-line;">{{ member.description }}</p>
          <button class="btn btn-outline-light mt-4 px-4 py-2 rounded-pill" @click="$router.push('/member')">
            <i class="bi bi-arrow-left me-2"></i>返回成員列表
          </button>
        </div>
      </div>
      <div v-else class="text-center py-5 mt-5">
        <h3 class="text-white mb-4">找不到該成員資料</h3>
        <button class="btn btn-outline-light px-4 py-2 rounded-pill" @click="$router.push('/member')">
          <i class="bi bi-arrow-left me-2"></i>返回成員列表
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useMemberStore, positionBadgeStyle } from '@/stores/memberStore';

export default {
  name: "MemberDetailView",
  data() {
    return {
      member: null
    };
  },
  computed: {
    badgeStyle() {
      return { color: positionBadgeStyle.color, backgroundColor: positionBadgeStyle.bg, border: '1px solid ' + positionBadgeStyle.color };
    },
  },
  created() {
    this.fetchMember();
  },
  watch: {
    '$route.params.id': 'fetchMember'
  },
  methods: {
    fetchMember() {
      const memberId = this.$route.params.id;
      const store = useMemberStore();
      this.member = store.getMemberById(memberId) || null;

      if (this.member) {
        document.title = `${this.member.name} - 樂團成員介紹`;
      }
    },

    handleImageError(e) {
      if (this.member) {
        e.target.src = `https://pbs.twimg.com/media/GBtW3HCacAAwykB.jpg`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.member-detail-page {
  display: flex;
  align-items: center;
}

.avatar-wrapper {
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: 8px;
  overflow: hidden;
  border: 5px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 .5rem 2rem rgba(255, 255, 255, 0.15) !important;
  }

  @media (min-width: 768px) {
    border-width: 8px;
  }
}

.object-fit-cover {
  object-fit: cover;
}

.member-name-text {
  letter-spacing: 0.2rem;
}

.member-role-text {
  letter-spacing: 0.1rem;
}

.position-badge {
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.3em 0.75em;
  letter-spacing: 0.03rem;
}

.lh-lg {
  line-height: 2 !important;
}
</style>
