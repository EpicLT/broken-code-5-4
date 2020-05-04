

module.exports ={
  run: function(creep, cRoom){



    var storageStructure;
    var linkStructure;
    var source;


      if(creep.memory.working != false && creep.carry.energy ==0){
        creep.memory.working = false;

      }else if(creep.memory.working != true && creep.carry.energy == creep.carryCapacity){
        creep.memory.working = true;
      }



      if(creep.memory.working == true) {

        if(Boolean(creep.memory.workTarget)){
          var target = Game.getObjectById(creep.memory.workTarget);
          if((target.structureType == STRUCTURE_SPAWN)||
          (target.structureType == STRUCTURE_EXTENSION)) {

            if(target.energy < target.energyCapacity){
              creep.memory.previousTarget = true;
              creep.memory.targetType = 'spawn';
            }else{
              creep.memory.previousTarget = false;
              creep.memory.workTarget = undefined;
              creep.memory.targetType = undefined;
              target = undefined;
            }
          }else if((target.structureType == STRUCTURE_CONTAINER)||
          (target.structureType == STRUCTURE_STORAGE)||
          ((target.structureType == STRUCTURE_TERMINAL)&&(target.store.energy < 5000))){
            if(target.store.energy < target.storeCapacity){
              creep.memory.previousTarget = true;
              creep.memory.targetType = 'store';
            }else{
              creep.memory.previousTarget = false;
              creep.memory.workTarget = undefined;
              creep.memory.targetType = undefined;
              target = undefined;

            }
          }
        }










        //console.log('am working');
        if(((creep.memory.previousTarget != true)||(Boolean(target)!= true))) {
          target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) =>
          { return ((structure.structureType == STRUCTURE_CONTAINER)&&
            ((structure.id != creep.memory.sourceContainer1)&&(structure.id != creep.memory.sourceContainer2)&&(structure.id != creep.memory.mineralSupply) )
          && (structure.store.energy < structure.storeCapacity)||
        ((structure.structureType == STRUCTURE_TERMINAL)&&(structure.store.energy < 5000))) } })
        }
        if((Boolean(target) != true )&& (creep.memory.storageBlock != undefined)) {
            storageStructure = Game.getObjectById(creep.memory.storageBlock)
            if(storageStructure.store.energy < storageStructure.storeCapacity){
              target = storageStructure;
            }
        }


        if (Boolean(target)){
          if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(target);
            creep.memory.workTarget = target.id;
          }
        }







      }

      else{


        // if((creep.memory.supply != undefined)&&(creep.memory.supply != false)){
        //   var theSupply = Game.getObjectById(creep.memory.supply);
        //   if((theSupply.store.energy) > (creep.carryCapacity/2)){
        //     source = theSupply
        //   }
        // }

          if(creep.memory.storageBlock != undefined){
            var altSource = cRoom.roomStructs.storage[0]
            if(altSource.store.energy >= (creep.carryCapacity/2)){
              source = altSource;
            }
          }
          if((Boolean(source) != true)) {
            var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) =>
            { return (    ((structure.structureType == STRUCTURE_CONTAINER)&&
              ((structure.id == creep.memory.sourceContainer1)||(structure.id == creep.memory.sourceContainer2)))
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
