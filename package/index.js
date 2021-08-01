import Main from './src';

export default {
  install(Vue, options) {


    const main = new Main()
    console.log(main.getComponents());





    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    //Vue.component("nice-handsome-button", NiceHandsomeButton);
  }
};
