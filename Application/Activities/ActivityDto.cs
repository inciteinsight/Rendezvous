using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Application.Activities
{
    public class ActivityDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        
        [JsonProperty("attendees")]
        public ICollection<AttendeeDto> Attendees { get; set; }
    }
}