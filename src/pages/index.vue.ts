import Game from '~/components/Game/Game.vue';
import HeaderComp from '~/components/Header/Header.vue';

export default {
  components: {
    Game,
    HeaderComp,
  },
  head () {
    return {
      title: 'New It Fest'
    }
  }
}
