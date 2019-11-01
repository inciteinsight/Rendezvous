using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using Application.Errors;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                Activity activity = await _context.Activities
                    .Include(x => x.UserActivities)
                    .ThenInclude(x => x.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {activity = "Not found"});
                }

                return activity;
            }
        }
    }
}