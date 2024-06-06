select route_name, route_active, count(*)
from route
group by route_name, route_active
HAVING count(*) > 1