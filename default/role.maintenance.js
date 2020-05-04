

module.exports ={
  run: function(creep, cRoom){
var storageStructure;

      if(creep.memory.working != false && creep.carry.energy ==0){
        creep.memory.working = false;

      }else if(creep.memory.working != true && creep.carry.energy == creep.carryCapacity){
        creep.memory.working = true;
      }



      if(creep.memory.working == true){

        if(creep.memory.timer == undefined){
          creep.memory.timer = 1;
        }else{
          creep.memory.timer += 1;
        }

        if(Boolean(creep.memory.workTarget)){


          target = Game.getObjectById(creep.memory.workTarget);
          if((target.structureType == STRUCTURE_TOWER)) {

            if(target.energy < target.energyCapacity){
              creep.memory.previousTarget = true;
              creep.memory.targetType = 'priority';
            }else{
              creep.memory.previousTarget = false;
              creep.memory.workTarget = undefined;
              creep.memory.targetType = undefined;
            }
          }else if((target.structureType == STRUCTURE_ROAD)||
          (target.structureType == STRUCTURE_CONTAINER)){
            if(target.hits < target.hitsMax){
              creep.memory.previousTarget = true;
              creep.memory.targetType = 'normal';
            }else{
              creep.memory.previousTarget = false;
              creep.memory.workTarget = undefined;
              creep.memory.targetType = undefined;

            }
          }
        }







        if(((creep.memory.previousTarget != true))||
        (((creep.memory.previousTarget == true)&&(creep.memory.targetType == 'normal')&&(creep.memory.timer >= 8)))) {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) =>
            { return (((structure.structureType == STRUCTURE_TOWER))
            && (structure.energy < structure.energyCapacity)) } })
            creep.memory.timer = 0;

        }

        if(((creep.memory.previousTarget != true))||(Boolean(target) != true)){


            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) =>
            { return ( (structure.hits < structure.hitsMax) &&
                    ((structure.structureType == STRUCTURE_CONTAINER)||
                    (structure.structureType == STRUCTURE_ROAD) ||
                    ((structure.structureType == STRUCTURE_RAMPART)&& (structure.hits < creep.memory.targetStrength*.50))
                    )) } })
            }













        if (target){
          if(target.structureType == STRUCTURE_TOWER){
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
              creep.memory.workTarget = target.id;
              creep.moveTo(target);
            }
          }else{
            if(creep.repair(target) == ERR_NOT_IN_RANGE){
              creep.memory.workTarget = target.id;
              creep.moveTo(target);
            }
          }

        }













      }

      else{

        if(!(storageStructure == Game.getObjectById(creep.memory.storageBlock))){

          if(!(creep.memory.storageBlock == undefined)){
            storageStructure = Game.getObjectById(creep.memory.storageBlock);
            if(storageStructure.store.energy > 0){
            var source = storageStructure;
            }
          }
          //console.log(creep.name + ":        " + storageStructure +"           " + Game.getObjectById(creep.memory.storageBlock));
        }



        if(Boolean(source) != true){
          var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) =>
          { return ((structure.structureType == STRUCTURE_CONTAINER)
          && (structure.store.energy > 0)) } })

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

    //console.log((int)Math.random(1,10));


  }
}
