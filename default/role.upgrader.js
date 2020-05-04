

module.exports ={
  run: function(creep){
    var storageStructure;
    var source = 'null';

      if(creep.memory.working != false && creep.carry.energy ==0){
        creep.memory.working = false;

      }else if(creep.memory.working != true && creep.carry.energy == creep.carryCapacity){
        creep.memory.working = true;
      }

    


      if(creep.memory.working == true){
        if(creep.memory.targetRoom == undefined){
          if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
            creep.moveTo(creep.room.controller);
          }
          else if((Boolean(creep.memory.hasContainer) != true)) {
            creep.memory.hasUpgraded = true;
          }
        }else{
          if ( (creep.room.name != creep.memory.targetRoom)&&((creep.pos.x != 0)&&(creep.pos.y != 0)&&(creep.pos.x != 49)&&(creep.pos.y != 49))) {
            //console.log('im going on a trip');
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
          }

          else if(creep.room.name == creep.memory.targetRoom){
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
              creep.moveTo(creep.room.controller);
            }
          }else{
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
          }
        }
      }












      else{



        if((creep.memory.hasUpgraded == true)&& (creep.memory.hasContainer == true)&&(Boolean(creep.memory.myContainer) == true)) {
          //console.log('i got me a good container at home');
          var theContainer = Game.getObjectById(creep.memory.myContainer);


          if(Boolean(theContainer) != true){
            creep.memory.hasContainer = false;
            creep.memory.hasUpgraded == false;
          }else if ((theContainer.store.energy > creep.carryCapacity)) {
            var source = theContainer;
          }else{
            creep.memory.hasContainer = false;
            creep.memory.hasUpgraded == false;
          }
        }


        else if((creep.memory.hasUpgraded == true)&& (creep.memory.hasContainer != true)){
          //console.log('putting a ring on a container');
          var thisContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) =>
          { return ((structure.structureType == STRUCTURE_CONTAINER)
          && (structure.store.energy > creep.carryCapacity)) } })

          if(Boolean(thisContainer)){
            creep.memory.myContainer = thisContainer.id;
            var source = thisContainer;
            creep.memory.hasContainer = true;
          }


        }



        else {
          //console.log('looking for containers');
          var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) =>
          { return ((structure.structureType == STRUCTURE_CONTAINER)
          && (structure.store.energy > 0)) } })

        }










        if(Boolean(source)){
          if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(source);
          }
        }else {


          var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
          if (creep.harvest(source) == ERR_NOT_IN_RANGE) {creep.moveTo(source);}

        }



      }


    }
  }
