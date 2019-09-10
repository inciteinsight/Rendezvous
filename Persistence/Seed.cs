using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if(!context.Activities.Any())
            {
                List<Activity> activities = new List<Activity>
                {
                    new Activity {Title = "Networking for Nurses",Description = "Meeting registered nurses from all over New York who specialize in different units ",Category = "Health/Medical",StartDate = DateTime.ParseExact("20191002T18:00:00Z", "yyyyMMddTHH:mm:ssZ", System.Globalization.CultureInfo.InvariantCulture),EndDate = DateTime.ParseExact("20191002T20:00:00Z", "yyyyMMddTHH:mm:ssZ", System.Globalization.CultureInfo.InvariantCulture),City = "New York, NY",Venue = "TBD"},
                    new Activity {Title = "Unity Games",Description = "Competition to foster the love of the brotherhood",Category = "Social",StartDate = DateTime.ParseExact("20191014T08:00:00Z", "yyyyMMddTHH:mm:ssZ", System.Globalization.CultureInfo.InvariantCulture),EndDate = DateTime.ParseExact("20191014T16:00:00Z", "yyyyMMddTHH:mm:ssZ", System.Globalization.CultureInfo.InvariantCulture),City = "TBD",Venue = "TBD"},
                    new Activity {Title = "Kadiwa Spartan Race",Description = "Where challengers are tested. The strong will previal.",Category = "Social",StartDate = DateTime.ParseExact("20191102T08:00:00Z", "yyyyMMddTHH:mm:ssZ", System.Globalization.CultureInfo.InvariantCulture),EndDate = DateTime.ParseExact("20191102T16:00:00Z", "yyyyMMddTHH:mm:ssZ", System.Globalization.CultureInfo.InvariantCulture),City = "TBD",Venue = "TBD"},
                    new Activity {Title = "Ice Skating",Description = "A world-class ice skating facility, the City Ice Pavilion features a NHL-size ice rink that is open year-round and is sheltered from winter weather by a sky-high Yeadon air dome",Category = "Social",StartDate = DateTime.ParseExact("20191215T13:00:00Z", "yyyyMMddTHH:mm:ssZ", System.Globalization.CultureInfo.InvariantCulture),EndDate = DateTime.ParseExact("20191215T15:00:00Z", "yyyyMMddTHH:mm:ssZ", System.Globalization.CultureInfo.InvariantCulture),City = "Long Island City, NY",Venue = "City Ice Pavillion"}
                };

                context.Activities.AddRange(activities);
                context.SaveChanges();
            }
        }
    }
}