<template>
  <div class="video-page">
    <div class="row mb-5">
      <div class="col-12 text-center">
        <div class="section-title-wrapper d-inline-flex flex-column align-items-center">
          <h2 class="display-4 fw-bold text-white mb-2 category-title">演出影音</h2>
          <div class="title-underline"></div>
          <p class="text-white-50 mt-3 letter-spacing-wide">PERFORMANCE VIDEOS</p>
        </div>
      </div>
    </div>

    <!-- Main Player Section -->
    <div class="row justify-content-center w-100 mb-5">
      <div class="col-12 col-xl-10 d-flex justify-content-center">
        <div class="main-player-card shadow-2xl overflow-hidden rounded-4">
          <div class="ratio ratio-16x9">
            <iframe :src="`https://www.youtube.com/embed/videoseries?list=${currentPlaylist.id}`"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
          </div>
          <div class="main-player-info p-4 d-flex align-items-center justify-content-between">
            <div>
              <h3 class="h4 fw-bold text-white mb-1">{{ currentPlaylist.title }}</h3>
              <p class="text-white-50 mb-0">正在播放此清單內容</p>
            </div>
            <div class="playlist-badge">
              <i class="bi bi-play-circle-fill me-2"></i>
              PLAYLIST
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Playlist Grid -->
    <div class="row justify-content-center">
      <div class="col-12 col-xl-10">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div v-for="playlist in playlists" :key="playlist.id" class="col">
            <div class="playlist-card h-100" :class="{ 'active-card': playlist.id === currentPlaylist.id }"
              @click="setCurrentPlaylist(playlist)">
              <div class="card bg-transparent border-0 overflow-hidden">
                <div class="playlist-thumbnail-wrapper position-relative">
                  <!-- YouTube Playlist Thumbnail - Using a custom thumbnail from the first video of each playlist would be better, 
                       but as a fallback we use a generic YouTube style overlay -->
                  <div class="thumbnail-aspect ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm">
                    <img :src="getPlaylistThumbnail(playlist)" class="img-fluid object-fit-cover w-100 h-100"
                      :alt="playlist.title">
                    <div class="thumbnail-overlay d-flex align-items-center justify-content-center">
                      <div class="play-button-icon">
                        <i class="bi bi-play-fill fs-2"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-body px-0 pt-3 pb-0">
                  <h4 class="h6 fw-bold text-white mb-2 playlist-title-text">{{ playlist.title }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="row mt-5 pt-5 pb-4">
      <div class="col-12 text-center text-white">
        <div class="border-top border-white border-opacity-10 pt-5 mb-4 max-w-lg mx-auto d-inline-block w-75"></div>
        <p class="mb-4 opacity-75">想查看更多精彩演出？歡迎訂閱我們的 YouTube 頻道</p>
        <a href="https://www.youtube.com/@weiyangsizhule666" target="_blank"
          class="btn btn-outline-light rounded-pill px-5 py-3 subscribe-btn">
          <i class="bi bi-youtube me-2"></i>前往 YouTube 頻道
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PerformanceVideoView",
  data() {
    return {
      currentPlaylist: { id: 'PLNgfI6_tCFiIjsseFl1-981CoBzzZyvw4', title: '【品味三國——空城與古琴(貳)】' },
      playlists: [
        { id: 'PLNgfI6_tCFiIjsseFl1-981CoBzzZyvw4', title: '【品味三國——空城與古琴(貳)】', firstVideoId: 'pMIwUfv3-tw' },
        { id: 'PLNgfI6_tCFiI1kk4VsizsgUX5XOmT6ja7', title: '【唱一段台灣歌】', firstVideoId: 'AKEGb5li57A' },
        { id: 'PLNgfI6_tCFiIndYOo40tPq-MdfJGFB5Ff', title: '【耕樂者】', firstVideoId: 'bTXL-nn1ACQ' },
        { id: 'PLNgfI6_tCFiJDeTEzNYqYdFoBFsjRbpUg', title: '【紅樓夢．樂】(貳)機關算盡王熙鳳', firstVideoId: '__J_59TvAzA' },
        { id: 'PLNgfI6_tCFiJ7vrZqW5IHPqJWgiwJwx1J', title: '【品味三國——空城與古琴】', firstVideoId: 'xT3IsmKHe1A' },
        { id: 'PLNgfI6_tCFiKPK_TAfBd2zwD03Ndp-W0p', title: '【紅樓夢‧樂】', firstVideoId: '5LjHyhU3flQ' },
      ],
    };
  },
  methods: {
    setCurrentPlaylist(playlist) {
      this.currentPlaylist = playlist;
      // Scroll to top of player if on mobile
      if (window.innerWidth < 992) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    getPlaylistThumbnail(playlist) {
      if (playlist.firstVideoId) {
        return `https://i.ytimg.com/vi/${playlist.firstVideoId}/hqdefault.jpg`;
      }
      return `https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/customVariables";

.video-page {
  background-color: $primary;
  color: white;
}

.category-title {
  letter-spacing: 0.3rem;
  font-family: serif;
}

.title-underline {
  width: 60px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  margin-top: 1rem;
}

.letter-spacing-wide {
  letter-spacing: 0.2rem;
  font-size: 0.85rem;
}

.main-player-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
  width: 800px;
  max-width: 100%;
}

.main-player-info {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.playlist-badge {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  letter-spacing: 0.1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.playlist-card {
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-5px);

    .thumbnail-overlay {
      opacity: 1;
    }

    .playlist-title-text {
      color: #fff !important;
    }
  }

  &.active-card {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);

    .playlist-title-text {
      color: #fff !important;
    }
  }
}

.playlist-thumbnail-wrapper {
  .thumbnail-aspect {
    background: rgba(0, 0, 0, 0.2);
  }
}

.thumbnail-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.play-button-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  backdrop-filter: blur(5px);
}

.playlist-count-overlay {
  background: rgba(0, 0, 0, 0.8);
  width: 30%;
  height: 100%;
  font-size: 0.75rem;
  letter-spacing: 0.1rem;
}

.playlist-title-text {
  color: rgba(255, 255, 255, 0.85);
  transition: color 0.3s ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.subscribe-btn {
  border-color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.1rem;

  &:hover {
    background: white;
    color: $primary;
  }
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.video-page {
  animation: fadeIn 0.8s ease-out;
}
</style>
