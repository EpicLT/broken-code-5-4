var bodyMaker = require('constructer.body');

module.exports = function(){



  var makeName = function(room,role){

      let newName = (room + "_" + role + "_" + Game.time);

      return newName;
    }


  StructureSpawn.prototype.createSimpleWorker = function(theSpawn, energy, homeRoom, roomLevel, roleName, creepSource,  creepStorage, mineralContainer, wallHits){
    if(typeof(creepSource)==='undefined') {creepSource = undefined;}
    if(typeof(wallHits)==='undefined') {wallHits = undefined;}


      let myName = makeName(homeRoom, roleName);
      //let roleType = 'simple';
      let finalBody = bodyMaker.run('simple', roomLevel);


      return this.spawnCreep(finalBody, myName, {memory:  {homeRoom : homeRoom, role : roleName, sourceBlock : creepSource, storageBlock : creepStorage, targetStrength : wallHits}});
    };


    StructureSpawn.prototype.createStationaryHarvester = function(theSpawn, energy, homeRoom, roomLevel, roleName, creepSource, creepStorage, mineralContainer, setStation, stationToStore,
       stationary, shortWalk, mineralCreep){
        if(typeof(shortWalk)==='undefined') {shortWalk = undefined;}
        if(typeof(mineralCreep)==='undefined') {mineralCreep = undefined;}

        // }

        let myName = makeName(homeRoom, roleName);
        let finalBody = bodyMaker.run(roleName, roomLevel);

        console.log(roomLevel);

        return this.spawnCreep(finalBody, myName, {memory:  {homeRoom : homeRoom, role : roleName, sourceBlock : creepSource, storageBlock : creepStorage, mineralContainer : mineralContainer, hasStation: setStation,
          stationaryStore: stationToStore, isStationary: stationary, hasMinerals: mineralCreep}}  );



      };


      StructureSpawn.prototype.createStationaryUpgrader = function(theSpawn, energy, homeRoom, roomLevel, roleName, creepStorage, stationary){

        let myName = makeName(homeRoom, roleName);
        let finalBody = bodyMaker.run(roleName, roomLevel);

          return this.spawnCreep(finalBody, myName,{memory: {homeRoom : homeRoom, role : roleName,  storageBlock : creepStorage, isStationary: stationary}});
        };


        StructureSpawn.prototype.claimNewRoom = function(newRoom){
          let myName = makeName('inadequate waffle', 'claimer');
            var body = [
                //CLAIM,
                MOVE,MOVE];

            return this.spawnCreep(body, myName, {memory:  {role : 'claimer', targetRoom : newRoom}});
          };





          StructureSpawn.prototype.breakWall = function(homeRoom, newRoom, targetWall){
            let myName = makeName('armored_titan ', ' the breacher  ');
              var body = [WORK,WORK,WORK,WORK,MOVE,MOVE];

              return this.spawnCreep(body, myName, {memory:  {role : 'breacher',homeRoom: homeRoom, targetRoom : newRoom, targetWall : targetWall}});
            };






      StructureSpawn.prototype.createFiller = function(theSpawn, energy, homeRoom, roomLevel, roleName, creepStorage, creepSupply, creepSupply2, mineralContainer,
         stationCheck, sourceblock1, sourceblock2, resourceType, terminalBlock){
        // if(typeof(energy)==='undefined') {energy = 200;}


        if(typeof(creepStorage)==='undefined') {creepStorage = undefined;}
        if(typeof(creepSupply)==='undefined') {creepSupply = undefined;}
        if(typeof(creepSupply2)==='undefined') {creepSupply2 = undefined;}
        if(typeof(mineralContainer)==='undefined') {mineralContainer = undefined;}
        if(typeof(stationCheck)==='undefined') {stationCheck = undefined;}
        if(typeof(sourceblock1)==='undefined') {sourceblock1 = undefined;}
        if(typeof(sourceblock2)==='undefined') {sourceblock2 = undefined;}
        if(typeof(resourceType)==='undefined') {resourceType = RESOURCE_ENERGY;}
        if(typeof(terminalBlock)==='undefined') {terminalBlock = RESOURCE_ENERGY;}

//console.log(roomLevel);

        let myName = makeName(homeRoom, roleName);
        //let bodyType = 'filler';
        let finalBody = bodyMaker.run('filler' , roomLevel);

          return this.spawnCreep(finalBody, myName, {memory: {homeRoom : homeRoom, role : roleName, storageBlock : creepStorage, supply: creepSupply, supply2: creepSupply2, mineralSupply: mineralContainer,
            hasStation: stationCheck, sourceContainer1: sourceblock1, sourceContainer2: sourceblock2, resourceType: resourceType, terminalBlock: terminalBlock}});
        };


        StructureSpawn.prototype.createSimpleDefender = function(theSpawn, energy, homeRoom, roomLevel, theRoom){
          if(typeof(theRoom)==='undefined') {theRoom = undefined;}


            let myName = makeName(homeRoom, roleName);
            let finalBody = bodyMaker.run('simple', roomLevel);



            return this.spawnCreep(finalBody, myName, {memory: {homeRoom : homeRoom, role : 'defender', targetRoom : theRoom}});
          };



          StructureSpawn.prototype.createHelperWorker = function(theSpawn, energy, homeRoom, roomLevel, theRole, creepStorage, theRoom){
            if(typeof(energy)==='undefined') {energy = 350;}
              var numberOfParts = Math.floor(energy/350);
              var body = [];


              var body1 = [];
              body1.length = numberOfParts;
              body1.fill(WORK);
              var body2 = [];
              body2.length = numberOfParts*2;
              body2.fill(CARRY);
              var body3 = [];
              body3.length = numberOfParts*3;
              body3.fill(MOVE);

              var finalBody = body1.concat(body2);
              var finalBody = finalBody.concat(body3);

              let myName = makeName(homeRoom, roleName);



              return this.spawnCreep(finalBody, myName, {memory: {homeRoom : homeRoom, role : theRole, targetRoom : theRoom, storageBlock : creepStorage} } );
            };

















  }
