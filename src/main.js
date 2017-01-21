// import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vue from 'vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

// require('assets/css/styles.css');

require('bootstrap/dist/css/bootstrap.min.css')
require('bootstrap/dist/js/bootstrap.min.js')
var store = require('store2')

var VueTouch = require('vue-touch')
Vue.use(VueTouch)

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
       
    menu_click: false,
    Delete: "blah",
    task: "showing task",
    task_delete: "blah blah",
    task_index: 0,  
    categories:[
      {id: 0, name: "home", tasks: []},
      {id: 1, name: "school", tasks: []}
     ],
    swiperOption: {
      pagination : '.swiper-pagination',
      paginationClickable: true, 
      onTransitionEnd(swiper){
        demo.$data.active_ID=swiper.activeIndex;
        // if(active_ID==categories)
        // demo.$data.categories[demo.$data.active_ID].is_active=true;
        
      }
    }
  
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

   beforeCompile() {
    sleep(3000);
  },

  // Functions we will be using.
  methods: {
    makeActive: function(name, id){
      // When a model is changed, the view will be automatically updated.
      this.active = name;
      // this.active_ID = id; 
      // this.categories[this.active_ID].is_active=true;
      this.swiper.slideTo(id);
      console.log('active id is '+this.categories[this.active_ID].name);
      // console.log('active name is '+this.categories[this.active_ID].is_active);
    
      // this.last_ID= id;

      
    },

    makeActiveAdd: function(item){
      // When a model is changed, the view will be automatically updated.
      this.active = item;
      // alert('add');

         
      
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
                this.newTask = "";
                store(index, this.categories[index]);
                // for (var i = 0; i < localStorage.length; i++){
                //     localStorage.getItem(localStorage.key(index));
                // }


          //Reset newTask to an empty string so the input field is cleared
         

      }
    },

    addCategory: function(addedtask){
      
       if(addedtask){

        
               
         this.categories.push({ 
          id: this.categories.length,
          name: addedtask,
          tasks: [],
          
         });
         this.active=addedtask;
         this.addedtask="";        
         
          var id=this.categories.length-1;
         this.$nextTick(function(){
           this.swiper.slideTo(id);
           store(id, this.categories[id]);
         });
        }
         // var id=this.categories.length-1;
         
      },


    deleteSelectedCategory: function(Delete){      
      var index = -1;
        for(var i=0; i<this.categories.length; i++){
        if(this.categories[i].name==Delete)
          index= i
        }
      if (index > -1) {
        this.categories.splice(index, 1);
      }
      this.swiper.slideTo(this.categories.length-1);
      this.active_ID=this.last_ID=this.categories.length-1;
      
      // this.active=this.categories[this.active_ID].name;
      // this.deleting="";

      store.remove(index);
    },

    alert_func: function(){
      alert('hey')
    },

    delete_task: function(task, category_id){
      
      var id=category_id;
      var index = -1; 

      // console.log(task);
      
      for(var i=0; i<this.categories[id].tasks.length; i++){
        if(this.categories[id].tasks[i].text==task)
          index= i                   
      }
        
      if (index > -1) {
        this.categories[id].tasks.splice(index, 1);
      }
    },

    task_done: function(task, category_id){
      
        var id = category_id; 
        var index= -1;


    
      // console.log(task);
      
      for(var i=0; i<this.categories[id].tasks.length; i++){
        if(this.categories[id].tasks[i].text==task)
          index= i                   
      }
        
      if (index > -1 && id > -1) {
        this.categories[id].tasks[index].done =! this.categories[id].tasks[index].done
      }

      // store.transact(index, function(obj) {
      //     // obj.changed = 'newValue'; 
      //   this.categories[id].tasks[index].done =! this.categories[id].tasks[index].done
      // };

      // console.log(this.categories[this.active_ID].tasks[index].done);
      // console.log(index);
    },
  },

  computed: {
    swiper() {
      return this.$refs.mySwiperA.swiper
    }
  },

  mounted: function() {
    let storedCategories = Object.values(store())

    if(storedCategories.length > 0){
      this.categories = storedCategories
    } else {
      // if nothing is there in localStorage, store the existing value of this.categories.
      for (var i = 0; i < this.categories.length; i++) {
        store(i, this.categories[i])
      }
    }
  },

  watch: {
    categories: {
      handler: function(newCategories){
        store(false);
        for (var i = 0; i < newCategories.length; i++) {
          store(i, newCategories[i])
        }
      },
      deep: true
    }   
  }
});

// $("#menu-toggle").click(function(e) {
//         e.preventDefault();
//         $("#wrapper").toggleClass("active");
// });

 $( ".glyphicon glyphicon-remove" ).hide();
        $( ".menu" ).hide();
        $( ".glyphicon glyphicon-th-list" ).click(function() {
          $( ".menu" ).slideToggle( "slow", function() {
            $( ".glyphicon glyphicon-th-list" ).hide();
            $( ".glyphicon glyphicon-remove" ).show();
          }); 
        });

        $( ".glyphicon glyphicon-remove" ).click(function() {
          $( ".menu" ).slideToggle( "slow", function() {
            $( ".glyphicon glyphicon-remove" ).hide();
            $( ".glyphicon glyphicon-th-list" ).show();
          });
        });

        $( ".menu ul a" ).click(function() {
          $( ".menu" ).slideToggle( "slow", function() {
            $( ".glyphicon glyphicon-remove" ).hide();
            $( ".glyphicon glyphicon-th-list" ).show();
          });
        });


 $(document).ready(function () {
          $(function () {
              $('li a').click(function (e) {
                  $('a').removeClass('active');
                  $(this).addClass('active');
              });
          });

      });



//         $(document).ready(function () {

//     $(function () {
//         $('li a').click(function (e) {
//             $('li a').hide();
           
//         });
//     });

// });

 $(function(){ 
     var navMain = $("#menu");
     navMain.on("click", "a", null, function () {
         navMain.collapse('hide');
     });
 });
