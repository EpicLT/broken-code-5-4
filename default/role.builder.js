

module.exports ={
  run: function(creep,cRoom){
var storageStructure;

    //Console.Log(creep.memory.target);
      if(creep.memory.working != false && creep.carry.energy ==0){
        creep.memory.working = false;

      }else if(creep.memory.working != true && creep.carry.energy == creep.carryCapacity){
        creep.memory.working = true;
      }


      if(creep.memory.working == true){




        if(Boolean(creep.memory.workTarget)){
        target = Game.getObjectById(creep.memory.workTarget);
        if(Boolean(target)){
            if(target.progress < target.progressTotal){
                creep.memory.previousTarget = true;
            }else{
                creep.memory.previousTarget = false;
                creep.memory.workTarget = undefined;
                target = undefined;
              }
            }else{
              creep.memory.previousTarget = false;
              creep.memory.workTarget = undefined;
              target = undefined;
            }

        }


        if(creep.memory.targetRoom == undefined){




          if(creep.memory.previousTarget != true){
            var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
          }

          if(creep.build(target) == ERR_NOT_IN_RANGE){
            creep.memory.workTarget = target.id;
            creep.moveTo(target);
          }
        }




        else{
          if ( (creep.room.name != creep.memory.targetRoom)&&((creep.pos.x != 0)&&(creep.pos.y != 0)&&(creep.pos.x != 49)&&(creep.pos.y != 49))) {
            //console.log('im going on a trip');
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
          }

          else if(creep.room.name == creep.memory.targetRoom){
            var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
            if(Boolean(target) == false){
              creep.suicide();
              //creep.memory.role = 'upgrader';
            }else{
              if(creep.build(target) == ERR_NOT_IN_RANGE){
                //if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(target);
              }
            }

          }else{
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
          }
        }


      }else{

        if(!(storageStructure == Game.getObjectById(creep.memory.storageBlock))){

          if(!(creep.memory.storageBlock == undefined)){
            storageStructure = Game.getObjectById(creep.memory.storageBlock);
            if(storageStructure.store.energy >= creep.carryCapacity ){
            var source = storageStructure;
            }
          }
          //console.log(creep.name + ":        " + storageStructure +"           " + Game.getObjectById(creep.memory.storageBlock));
        }



        if((Boolean(source) != true)&&(creep.memory.targetRoom == undefined)){
          var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) =>
          { return ((structure.structureType == STRUCTURE_CONTAINER)
          && (structure.store.energy >= creep.carryCapacity)) } })

        }


        if(Boolean(source) != false){
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
