<template>
  <nav class="navbar navbar-dark navbar-expand-md header" @touchmove.stop>
    <RouterLink class="header-index-link" to="/" @click="checkNavExpend">
      <img src="/logo_text.png" alt="weiyang_logo" class="header-logo"
    /></RouterLink>
    <button
      class="navbar-toggler border-0"
      @click="navbarExpend = !navbarExpend"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#weiYangNavbarScroll"
      aria-controls="navbarScroll"
      aria-expanded="false"
      aria-label="Toggle navigation"
      ref="toggleButton"
    >
      <div class="position-relative" style="width: 30px; height: 30px">
        <Transition name="scale">
          <span
            v-if="!navbarExpend"
            class="navbar-toggler-icon header-toggler-icon text-white"
          ></span>
          <span
            v-else
            class="navbar-toggler-icon header-toggler-icon btn-close"
          ></span>
        </Transition>
      </div>
    </button>
    <div
      class="collapse flex-grow-md-1 flex-grow-0 navbar-collapse"
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
          <ul class="dropdown-menu dropdown-menu-dark animate effect p-0">
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
      navbarExpend: false,
      headerLinks: [
        {
          title: "????????????",
          children: [
            { title: "????????????", path: "/about" },
            { title: "????????????", path: "/about" },
          ],
        },
        {
          title: "????????????",
          children: [
            { title: "????????????", path: "/about" },
            { title: "????????????", path: "/about" },
            { title: "????????????", path: "/about" },
            { title: "???????????????", path: "/about" },
            { title: "????????????", path: "/about" },
          ],
        },
        {
          title: "????????????",
          children: [{ title: "????????????", path: "/about" }],
        },
        {
          title: "????????????",
          children: [
            { title: "????????????", path: "/about" },
            { title: "????????????", path: "/about" },
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
  @media (min-width: map-get($grid-breakpoints, md)) {
    padding: 32px 40px;
  }
}
.header-logo {
  height: 36px;
}
.header-item-frame {
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  @media (min-width: map-get($grid-breakpoints, md)) {
    overflow-y: visible;
  }
}
.header-item-frame > .nav-item:last-child {
  padding: 0px;
  @media (min-width: map-get($grid-breakpoints, md)) {
    padding-right: 40px;
  }
}
.header-item-frame .dropdown-menu {
  top: calc(100% - 30px);
}
.header-dropdown {
  padding: 12px 16px;
  @media (min-width: map-get($grid-breakpoints, md)) {
    padding: 38px 20px;
  }
}
.dropdown-item.header-dropdown-item {
  padding: 16px 12px;
  @media (min-width: map-get($grid-breakpoints, md)) {
    padding: 12px 16px;
  }
}

.header-toggler-icon {
  position: absolute;
  left: 0;
}
.header-toggler-icon.btn-close {
  opacity: 1;
  filter: invert(1);
}

.scale-enter-active,
.scale-leave-active {
  transform: scale(1);
  transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
}

.animate {
  animation-duration: 0.2s;
  animation-fill-mode: both;
}

.effect {
  animation-name: scale;
}

@media (min-width: map-get($grid-breakpoints, md)) {
  .effect {
    animation-name: slide-in;
  }
}

@keyframes slide-in {
  0% {
    transform: translateY(1rem);
    opacity: 0;
  }

  100% {
    transform: translateY(0rem);
    opacity: 1;
  }
}

@keyframes scale {
  0% {
    transform: scaleY(0%);
  }

  100% {
    transform: scaleY(100%);
  }
}
</style>
