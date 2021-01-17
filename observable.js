var App = {};


(function($app){
 

     
    $app.observable = function(vl){

        var listeners = [];
        var $vl = vl;

         function trigger(){
           listeners.forEach(function(v,k){
             v($vl);
           }); 
         }


        return {

             get(){
               return $vl;
             },

             set(v){
               $vl = v;
               trigger();
             },

             listen(cb){
                listeners.push(cb);
                trigger();
             }


        };


    };


    $app.computed = function(cb,$observables){
 
        var obs = $app.observable(); //computed observable.
     
        $observables.forEach(function($observable,k){
           
            $observable.listen(function(vl){

                obs.set(cb());

            });

        });

        return obs;

    };


})(App);