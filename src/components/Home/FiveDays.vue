<template>
  <b-container fluid class="w-75 h-100">
    <b-card-group deck>
      <b-card
        v-for="(day,index) in fiveForecast"
        lg="8"
        :key="index"
        bg-variant="light"
        :header="day.Day"
        class="text-center headerSize"
        :header-bg-variant="colorTheme"
        :border-variant="colorTheme"
        header-text-variant="white"
      >
        <b-card-text class="bodysize">{{day.Temperature}} °C</b-card-text>
      </b-card>
    </b-card-group>
  </b-container>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      fiveForecast: "fiveForecast",
      colorTheme:"themeChange"
    }),
  }
};
</script>
<style scoped>
.headerSize {
  font-size: 30px;
  font-weight: bold;
}
.headerSize .bodysize {
  font-size: 20px;
  font-weight: lighter;
}
</style>