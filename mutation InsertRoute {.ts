mutation InsertRoute {
  insert_route_one(object: {
        route_brevet_distance: 300,
        route_distance: 300,
        route_name: "Refined Sons&lsquo; Foolish",
        route_start_location: "Tim Horton's, 9919 Glendon, Dr., Komoka, ON",
        route_cuesheet: "https://ridewithgps.com/routes/40818285",
        route_chapter: 4,
        route_active: true
    }) {
    route_active
    route_id
    route_name
  }
}