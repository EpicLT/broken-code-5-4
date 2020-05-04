module.exports ={
  run: function(roomTerminal){

    //

      var roomResource = roomTerminal.room.memory.mineralType;
      var buyOrders = Game.market.getAllOrders({resourceType: roomResource, type: ORDER_BUY });
      _.sortBy(buyOrders, ['price']);


      if(((Boolean(roomTerminal.cooldown) != true)&&(roomTerminal.store[roomResource])&& (buyOrders.length > 0))) {

        Game.market.deal(buyOrders[0].id, roomTerminal.store[roomResource], roomTerminal.room.name);

      }

  }
}
