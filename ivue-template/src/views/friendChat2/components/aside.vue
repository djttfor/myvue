<template>
  <div id="userList">
    <div class="upArea"></div>
    <div class="downArea">
      <div
        v-for="i in 11"
        :class="{
          active: i === currentSelected,
          downItem: i !== currentSelected,
        }"
        :key="i"
        @click="changeCurrentSelected(i)"
      >
        {{ i }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "aside",
  data() {
    return {
      currentSelected: -1,
    };
  },
  methods: {
    changeCurrentSelected(i) {
      this.currentSelected = i;
    },
  },
};
</script>

<style lang="scss" scoped>
#userList {
  width: 200px;
  height: 600px;
  border: 1px green solid;
  background-color: #edeae8;
}
.upArea {
  height: 100px;
  border-bottom: black solid 1px;
}
.downArea {
  height: 500px;
  width: 200px;
  overflow-y: scroll;
}
.downArea > div {
  height: 50px;
}
.downItem:hover {
  background-color: #e5e3e3;
}
div.active {
  background-color: #c7c6c6;
}
</style>
