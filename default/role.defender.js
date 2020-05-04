module.exports ={
  run: function(creep,cRoom){


    var targetRoom = creep.memory.targetRoom;
    //console.log(testing);
    if(targetRoom != undefined){
      if ( (creep.room.name != targetRoom)&&((creep.pos.x != 0)&&
      (creep.pos.y != 0)&&(creep.pos.x != 49)&&(creep.pos.y != 49)) ) {

        var exit = creep.room.findExitTo(targetRoom);
        creep.moveTo(creep.pos.findClosestByRange(exit));
      }else if((creep.room.name == targetRoom)||(targetRoom == undefined)){
        var hostile = creep.room.find(FIND_HOSTILE_CREEPS);
        if(creep.attack(hostile) == ERR_NOT_IN_RANGE){

          creep.moveTo(hostile);
        }

       }
       else{
        var exit = creep.room.findExitTo(targetRoom);
        creep.moveTo(creep.pos.findClosestByRange(exit));
      }
    }else{
      var hostile = creep.room.find(FIND_HOSTILE_CREEPS);
      if(Boolean(hostile.length) > 0){
        if(creep.attack(hostile) == ERR_NOT_IN_RANGE){

          creep.moveTo(hostile);
        }
      }else{

        var idle = creep.pos.findClosestByPath(FIND_FLAGS, {filter: (flag) =>
        { return ((flag.name ==  String(creep.room.name) + "_IDLE")) } })
        creep.moveTo(idle)
      }


    }





  }
}
