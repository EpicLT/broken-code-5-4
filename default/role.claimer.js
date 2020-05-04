

module.exports ={
  run: function(creep, cRoom){
    var storageStructure;
    var source = 'null';



    let targetRoom = creep.memory.targetRoom[0];
    //console.log(testing);

    if ( (creep.room.name != creep.memory.targetRoom[0])&&((creep.pos.x != 0)&&
    (creep.pos.y != 0)&&(creep.pos.x != 49)&&(creep.pos.y != 49)) ) {

      var exit = creep.room.findExitTo(creep.memory.targetRoom[0]);

      creep.moveTo(creep.pos.findClosestByRange(exit));

      if(creep.moveTo(creep.pos.findClosestByRange(exit)) == ERR_NO_PATH){

        let portal = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (p) =>{ return ((p.structureType == STRUCTURE_PORTAL))} })
        creep.moveTo(portal);
        if(portal.destination.roomName === creep.memory.targetRoom[0]){
          creep.moveTo(portal);
        }

      }

    }else if(creep.room.name == creep.memory.targetRoom[0]){
      if(creep.pos.findInRange(STRUCTURE_PORTAL, 0).length > 0){console.log('whoops');creep.moveTo(25,25);}
      if(creep.memory.targetRoom.length > 1){creep.memory.targetRoom.shift();}

      //'W58N30','W54N30','W54N32'

      if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE){

        creep.moveTo(creep.room.controller);
      }
      if((creep.room.controller)&&(creep.room.controller.level > 0)) {

        creep.memory.role = 'builder';
      }

     }









     else{
      var exit = creep.room.findExitTo(targetRoom);
      creep.moveTo(creep.pos.findClosestByRange(exit));
    }
  }
}
