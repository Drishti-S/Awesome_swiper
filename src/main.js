// import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vue from 'vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

// require('assets/css/styles.css');

require('bootstrap/dist/css/bootstrap.min.css')

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
    last_ID: 1,
    
    menu_click: false,
    Delete: "Delete",
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



    on_slide: function(){
    	this.active_ID=this.swiper.activeIndex;
    	console.log(this.active_ID);
    	console.log(this.swiper.activeIndex);
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
        
      if (id > -1) {
        this.categories[id].tasks[index].done =! this.categories[id].tasks[index].done
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