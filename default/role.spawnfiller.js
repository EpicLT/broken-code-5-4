

module.exports ={
  run: function(creep, cRoom){

    var storageStructure;
    var stationarySupply;
    var source;
    var theSupply

    //creep.suicide();
    //console.log("creep: "+creep.memory.stationarySupply);

      if(creep.memory.working != false && creep.carry.energy ==0){
        creep.memory.working = false;

      }else if(creep.memory.working != true && creep.carry.energy == creep.carryCapacity){
        creep.memory.working = true;
      }



      if(creep.memory.working == true) {


          if(Boolean(creep.memory.workTarget)){
          target = Game.getObjectById(creep.memory.workTarget);
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
          (target.structureType == STRUCTURE_STORAGE)){
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

        if(((creep.memory.previousTarget != true)||(Boolean(target)!= true)||
        (((creep.memory.previousTarget == true)&&(creep.memory.targetType == 'store'))))) {

          target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (structure) =>
          { return (((structure.structureType == STRUCTURE_SPAWN)||(structure.structureType == STRUCTURE_EXTENSION))
          && (structure.energy < structure.energyCapacity)) } })


          // if(Boolean(target) != true){
          //   creep.memory.noSpawnTargets = true;
          // }else{
          //   creep.memory.noSpawnTargets = false;
          // }

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



        if(creep.memory.supply != undefined){

          theSupply = Game.getObjectById(creep.memory.supply);
          if(Boolean(theSupply)){
            if((theSupply.store.energy) >= (creep.carryCapacity)){
              source = theSupply;
            }else if(creep.memory.supply2 != undefined){
              theSupply = Game.getObjectById(creep.memory.supply2);
              if(Boolean(theSupply)){
                if((theSupply.store.energy) >= (creep.carryCapacity)){
                  source = theSupply;
                }
              }
            }
          }
        }

        if(Boolean(source) != true){
          creep.memory.switchSource = true;
        }else{
          creep.memory.switchSource = false;
        }

        if(((creep.memory.switchSource == true) || (Boolean(source) != true))
        //&&(creep.memory.noSpawnTargets != true)
      ) {
          if(creep.memory.storageBlock != undefined){
            var altSource = Game.getObjectById(creep.memory.storageBlock)
            if(altSource.store.energy >= (creep.carryCapacity)){
              source = altSource;
            }
          }
        }



        if(Boolean(source) != false){
          if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(source);
          }
        }






      }



    }
  }
