<template>
  <div class="news-section text-white py-5">
    <div class="container py-5">
      <!-- Tabs -->
      <ul class="nav justify-content-center mb-5 news-tabs">
        <li class="nav-item">
          <a class="nav-link active" href="#" @click.prevent>最新消息</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent>演出訊息</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent>講座訊息</a>
        </li>
      </ul>

      <!-- Cards -->
      <div class="row justify-content-center g-5 mt-3">
        <!-- Card 1 -->
        <div class="col-12 col-md-4 px-4">
          <div class="news-card position-relative h-100">
            <div class="card-img-placeholder" style="background-color: #ffdce0;">
                <div class="border-top border-bottom border-danger opacity-25" style="height: 100%; width: 100%;"></div>
            </div>
            
            <div class="news-content bg-white text-dark position-absolute p-4 d-flex flex-column justify-content-between">
              <div>
                <h4 class="fw-bold mb-3 letter-spacing-wide font-serif">紅樓夢．樂</h4>
              </div>
              <div>
                <p class="mb-0 text-muted small lh-lg">藝術的融合，一起至情深，</p>
                <p class="mb-0 text-muted small lh-lg">都云作者痴，誰解其中味。</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="col-12 col-md-4 px-4">
          <div class="news-card position-relative h-100">
            <div class="card-img-placeholder" style="background-color: #e6e9e6;">
                <div class="border-start border-end border-secondary opacity-25" style="height: 100%; width: 100%;"></div>
            </div>

            <div class="news-content bg-white text-dark position-absolute p-4 d-flex flex-column justify-content-between">
              <div>
                <h4 class="fw-bold mb-3 letter-spacing-wide font-serif">與君．約</h4>
              </div>
              <div>
                <p class="mb-0 text-muted small lh-lg">未央樂集感謝諸元諸空間的源，</p>
                <p class="mb-0 text-muted small lh-lg">以空靈哀婉的傳統古風之約。</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="col-12 col-md-4 px-4">
          <div class="news-card position-relative h-100">
            <div class="card-img-placeholder" style="background-color: #ffdce0;">
                <div class="border border-danger opacity-25 rounded-circle m-3" style="height: 90%; width: 90%;"></div>
            </div>

            <div class="news-content bg-white text-dark position-absolute p-4 d-flex flex-column justify-content-between">
              <div>
                <h4 class="fw-bold mb-3 letter-spacing-wide font-serif">四季高雄再踏查</h4>
              </div>
              <div>
                <p class="mb-0 text-muted small lh-lg">邀請您與我們以音樂、文學、影像</p>
                <p class="mb-0 text-muted small lh-lg">一同對高雄的四季再踏查。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- More Button -->
      <div class="text-center mt-5 pt-5">
        <RouterLink to="/news" class="btn btn-outline-light rounded-0 px-4 py-2 mt-5 letter-spacing-wide shadow-none">
          查看更多 <i class="bi bi-arrow-right ms-3"></i>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  name: "NewsSection",
  components: {
    RouterLink,
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/customVariables";

.news-section {
  background-color: #0c0f12; /* Adjust to match the screenshot */
}

.news-tabs {
  .nav-link {
    color: rgba(255, 255, 255, 0.6);
    padding: 0.5rem 2rem;
    font-size: 1.1rem;
    letter-spacing: 2px;
    transition: all 0.3s ease;
    
    &:hover {
      color: white;
    }
    
    &.active {
      color: white;
      border-bottom: 1px solid white;
    }
  }
}

.card-img-placeholder {
  width: 100%;
  height: 480px;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.news-card {
  
  .news-content {
    bottom: -30px; 
    left: -20px; 
    width: 90%;
    height: 180px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    
    h4 {
      letter-spacing: 0.15rem;
      margin-bottom: 1rem;
    }
    
    p {
      line-height: 1.8;
      letter-spacing: 1px;
      font-size: 0.85rem;
    }
  }
}

.letter-spacing-wide {
  letter-spacing: 0.2em;
}

.font-serif {
  font-family: serif; /* Gives a more elegant look fitting the theme */
}

.btn-outline-light {
    border-color: rgba(255,255,255,0.4);
    &:hover {
        background-color: transparent;
        color: white;
        border-color: white;
    }
}
</style>
