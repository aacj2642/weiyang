<template>
  <nav class="navbar navbar-dark navbar-expand-sm header" @touchmove.stop>
    <RouterLink class="header-index-link" to="/" @click="checkNavExpend">
      <img src="/logo_text.png" alt="weiyang_logo" class="header-logo"
    /></RouterLink>
    <button
      class="navbar-toggler border-0"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#weiYangNavbarScroll"
      aria-controls="navbarScroll"
      aria-expanded="false"
      aria-label="Toggle navigation"
      ref="toggleButton"
    >
      <span class="navbar-toggler-icon text-white"></span>
    </button>
    <div
      class="collapse flex-grow-sm-1 flex-grow-0 navbar-collapse"
      id="weiYangNavbarScroll"
      ref="navbar"
    >
      <ul class="navbar-nav my-0 header-item-frame">
        <li
          v-for="headerLink in headerLinks"
          :key="headerLink.title"
          class="nav-item dropdown"
        >
          <a
            class="nav-link dropdown-toggle header-dropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ headerLink.title }}
          </a>
          <ul class="dropdown-menu dropdown-menu-dark p-0">
            <li v-for="child in headerLink.children" :key="child.title">
              <RouterLink
                class="dropdown-item header-dropdown-item"
                @click="checkNavExpend"
                :to="child.path"
              >
                {{ child.title }}
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>

  <!-- <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink> -->
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      headerLinks: [
        {
          title: "關於我們",
          children: [
            { title: "樂集介紹", path: "/about" },
            { title: "成員介紹", path: "/about" },
          ],
        },
        {
          title: "樂團動向",
          children: [
            { title: "最新消息", path: "/about" },
            { title: "演出訊息", path: "/about" },
            { title: "講座訊息", path: "/about" },
            { title: "活動行事曆", path: "/about" },
            { title: "演出影音", path: "/about" },
          ],
        },
        {
          title: "周邊販售",
          children: [{ title: "商品列表", path: "/about" }],
        },
        {
          title: "會員專區",
          children: [
            { title: "我的活動", path: "/about" },
            { title: "訂單列表", path: "/about" },
          ],
        },
      ],
    };
  },
  methods: {
    checkNavExpend() {
      if ([...this.$refs.navbar.classList].includes("show")) {
        this.$refs.toggleButton.click();
      }
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@import "../scss/customVariables";
.header {
  padding: 0;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(var(--bs-primary-rgb), 0.8);
  border-bottom: 1px solid var(--bs-white-40);
}
.header-index-link {
  padding: 14px 12px;
  @media (min-width: map-get($grid-breakpoints, sm)) {
    padding: 32px 40px;
  }
}
.header-logo {
  height: 36px;
}
.header-item-frame {
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  @media (min-width: map-get($grid-breakpoints, sm)) {
    overflow-y: visible;
  }
}
.header-item-frame > .nav-item:last-child {
  padding: 0px;
  @media (min-width: map-get($grid-breakpoints, sm)) {
    padding-right: 40px;
  }
}
.header-item-frame .dropdown-menu {
  top: calc(100% - 30px);
}
.header-dropdown {
  padding: 38px 20px;
}
.dropdown-item.header-dropdown-item {
  padding: 16px 12px;
  @media (min-width: map-get($grid-breakpoints, sm)) {
    padding: 12px 16px;
  }
}
</style>
