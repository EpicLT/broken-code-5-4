

module.exports ={
  run: function(creep){
var storageStructure;

      if(creep.memory.working != false && creep.carry.energy ==0){
        creep.memory.working = false;

      }else if(creep.memory.working != true && creep.carry.energy == creep.carryCapacity){
        creep.memory.working = true;
      }



      if(creep.memory.working == true){

        if(Boolean(creep.memory.workTarget)){
        target = Game.getObjectById(creep.memory.workTarget);
        if(Boolean(target)){
            if(target.hits < creep.memory.targetStrength){
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



        if(creep.memory.previousTarget != true){
          var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) =>
          { return (((structure.structureType == STRUCTURE_WALL))
          && (structure.hits < creep.memory.targetStrength)) } })
        }

        if (Boolean(target)){
          if(creep.repair(target) == ERR_NOT_IN_RANGE){
            creep.memory.workTarget = target.id;
            creep.moveTo(target);
          }
        }
        // else{
        //   var idle = creep.pos.findClosestByPath(FIND_FLAGS, {filter: (flag) =>
        //   { return ((flag.name == "IDLE")) } })
        //   creep.moveTo(idle)
        // }













      }



      //REFILL
      else{

        if(!(storageStructure == Game.getObjectById(creep.memory.storageBlock))){

          if(!(creep.memory.storageBlock == undefined)){
            storageStructure = Game.getObjectById(creep.memory.storageBlock);
            if(storageStructure.store.energy >= creep.carryCapacity){
            var source = storageStructure;
            }
          }
          //console.log(creep.name + ":        " + storageStructure +"           " + Game.getObjectById(creep.memory.storageBlock));
        }



        if(Boolean(source) != true){
          var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) =>
          { return ((structure.structureType == STRUCTURE_CONTAINER)
          && (structure.store.energy >= creep.carryCapacity)) } })

        }


        if(Boolean(source) != false){
          if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(source);
          }
        }
      }


    }




  }
