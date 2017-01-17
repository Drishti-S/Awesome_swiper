// import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vue from 'vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

require('assets/css/styles.css');

 
Vue.use(VueTouch, {name: 'v-touch'})
// const vueSwipe = VueSwipe.Swipe;
// const vueSwipeItem = VueSwipe.SwipeItem;

// var Swiper = require('swiper')
// var SwiperComponent = require('./swiper.vue')
// var SlideComponent = require('./slide.vue')
// if (typeof global.window != 'undefined') window.Swiper = Swiper

// var swiper = {
//   swiperSlide: SlideComponent,
//   swiper: SwiperComponent,
//   swiperPlugins: Swiper.prototype.plugins,
//   install: function(Vue) {
//     Vue.component('swiper', SwiperComponent)
//     Vue.component('swiper-slide', SlideComponent)
//   }
// }

// module.exports = swiper


var demo = new Vue({
  
  // A DOM element to mount our view model.
  el: '#main',

        // This is the model.
  // Define properties and give them initial values.
  data: {
    active: 'home',
    newTask: "",
    addedtask: "",
    active_ID: 0,
    last_ID: 1,
    
    menu_click: false,
    Delete: "",
    task: "showing task",
    task_delete: "blah blah",
    task_index: 0,  
    categories:[
      {id: 0, name: "home", tasks: []},
      {id: 1, name: "school", tasks: []}
     ]
     // length_cat: this.categories.length,
    
  },

  // components: {
  //     'swipe': vueSwipe,
  //     'swipe-item': vueSwipeItem                       
  //   },

  components: {
    swiper,
    swiperSlide
  },

  // Functions we will be using.
  methods: {
    makeActive: function(name, id){
      // When a model is changed, the view will be automatically updated.
      this.active = name;
      this.active_ID = id; 
      this.menu_click= true;

      this.swiper.slideTo(id);

      // this.last_ID= id;

      
    },

    makeActiveAdd: function(item){
      // When a model is changed, the view will be automatically updated.
      this.active = item;

         
      
    },

    addTask: function(name) {
      //trim() is used to remove whitespace from both ends of a string
      var task = this.newTask.trim();
      var index=-1;
      // console.log(this.categories)

      //if task is not an empty string
      if (task) {

              for(var i=0; i<this.categories.length; i++){
                if(this.categories[i].name==name)
                  index=i;
              }

              // TO DO: disallow if the index is -1.


                this.categories[index].tasks.push({
                text: task,
                done: false
           });  

          //Reset newTask to an empty string so the input field is cleared
          this.newTask = "";

      }
    },

    addCategory: function(addedtask){
       
       if(addedtask){

        
               
         this.categories.push({ 
          id: this.categories.length,
          name: addedtask,
          tasks: []
         });
         this.active=addedtask;
         this.addedtask="";
         this.active_ID=this.last_ID=this.categories.length - 1;
         
        }
      },


    deleteSelectedCategory: function(){      
      var index = -1;
      for(var i=0; i<this.categories.length; i++){
        if(this.categories[i].name==this.Delete)
          index= i
        }
      if (index > -1) {
        this.categories.splice(index, 1);
      }
      this.active_ID=this.last_ID=this.categories.length-1;
      this.active=this.categories[this.active_ID].name;
    },

    alert_func: function(){
      alert('hey')
    },

    delete_task: function(task){
      var index = -1; 

      // console.log(task);
      
      for(var i=0; i<this.categories[this.active_ID].tasks.length; i++){
        if(this.categories[this.active_ID].tasks[i].text==task)
          index= i                   
      }
        
      if (index > -1) {
        this.categories[this.active_ID].tasks.splice(index, 1);
      }
    },

    task_done: function(task){
      
        var index = -1; 
    
      // console.log(task);
      
      for(var i=0; i<this.categories[this.active_ID].tasks.length; i++){
        if(this.categories[this.active_ID].tasks[i].text==task)
          index= i                   
      }
        
      if (index > -1) {
        this.categories[this.active_ID].tasks[index].done =! this.categories[this.active_ID].tasks[index].done
      }

      // console.log(this.categories[this.active_ID].tasks[index].done);
      // console.log(index);
    },

    range: function(n){
     for(i=n; i<this.categories.length; i++)
      return i;
    }

   
  },

  computed: {
    swiper() {
      return this.$refs.mySwiperA.swiper
    }
  }

 

});




 $( ".cross" ).hide();
        $( ".menu" ).hide();
        $( ".hamburger" ).click(function() {
          $( ".menu" ).slideToggle( "slow", function() {
            $( ".hamburger" ).hide();
            $( ".cross" ).show();
          }); 
        });

        $( ".cross" ).click(function() {
          $( ".menu" ).slideToggle( "slow", function() {
            $( ".cross" ).hide();
            $( ".hamburger" ).show();
          });
        });

        $( ".menu ul a" ).click(function() {
          $( ".menu" ).slideToggle( "slow", function() {
            $( ".cross" ).hide();
            $( ".hamburger" ).show();
          });
        });