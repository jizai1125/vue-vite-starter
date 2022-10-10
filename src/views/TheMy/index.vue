<script lang="ts">
export default {
  name: 'TheMy'
}
</script>
<script setup lang="ts">
const themeVars = {
  cellLineHeight: '40px',
  cellFontSize: '16px',
  cellTextColor: '#282828',
  cellIconSize: '16px',
  cellRightIconColor: '#999'
}
</script>

<template>
  <div class="my-container g-container">
    <div class="user-brief">
      <div class="avatar">
        <van-image
          round
          width="70"
          height="70"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        <div class="user">
          <span class="name">这周的我很废材</span>
          <span class="phone">13022378424</span>
        </div>
      </div>
      <van-grid :column-num="3" class="my-cards" :border="false">
        <van-grid-item class="card-item">
          <span class="num">1</span>
          <span class="desc">我的卡券</span>
        </van-grid-item>
        <van-grid-item class="card-item">
          <span class="num">1</span>
          <span class="desc">我的积分</span>
        </van-grid-item>
        <van-grid-item class="card-item">
          <span class="num">1</span>
          <span class="desc">我的订单</span>
        </van-grid-item>
      </van-grid>
    </div>
    <van-config-provider :theme-vars="themeVars">
      <van-cell-group class="actions">
        <van-cell icon="user-o" title="实名认证" is-link />
        <van-cell icon="location-o" title="配送地址" is-link />
        <van-cell icon="service-o" title="联系客服" is-link />
      </van-cell-group>
    </van-config-provider>
  </div>
</template>

<style lang="scss" scoped>
.my-container {
  padding: 10px;
  .user-brief {
    padding: 20px 12px 0;
    margin-bottom: 18px;
    box-shadow: 0px 2px 15px 0px rgba(148, 155, 175, 0.2);
    border-radius: 12px;
    .avatar {
      display: flex;
      align-items: center;
      .user {
        display: flex;
        flex-direction: column;
        color: #191919;
        margin-left: 14px;
        .name {
          font-weight: 500;
          margin-bottom: 6px;
        }
        .phone {
          font-size: 14px;
        }
      }
    }
    .my-cards {
      .card-item {
        &:not(:last-child):after {
          position: absolute;
          right: 0;
          top: 25%;
          content: '';
          width: 1px;
          height: 50%;
          background: #000;
          opacity: 0.2;
        }
        .num {
          font-size: 17px;
          color: #333;
        }
        .desc {
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
  .actions {
    box-shadow: 0px 2px 15px 0px rgba(148, 155, 175, 0.2);
    border-radius: 12px;
  }
}
</style>
