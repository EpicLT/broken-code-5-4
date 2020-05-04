

module.exports ={
  run: function(creep,cRoom){
    var storageStructure;
    var source = 'null';



    let targetRoom = creep.memory.targetRoom[0];
    let targetWall = Game.getObjectById(creep.memory.targetWall);
    //console.log(testing);

    if ( (creep.room.name != creep.memory.targetRoom[0])&&((creep.pos.x != 0)&&
    (creep.pos.y != 0)&&(creep.pos.x != 49)&&(creep.pos.y != 49)) ) {

      var exit = creep.room.findExitTo(creep.memory.targetRoom[0]);
      creep.moveTo(creep.pos.findClosestByRange(exit));
    }else if(creep.room.name == creep.memory.targetRoom[0]){

      //creep.moveTo(targetWall);

      if(creep.memory.targetRoom.length > 1){
        creep.memory.targetRoom.shift();


      }else{
        if(creep.dismantle(targetWall) == ERR_NOT_IN_RANGE){
          creep.moveTo(targetWall);
        }


      }

      //'W58N30','W54N30','W54N32'



     }









     else{
      var exit = creep.room.findExitTo(targetRoom);
      creep.moveTo(creep.pos.findClosestByRange(exit));
    }
  }
}
