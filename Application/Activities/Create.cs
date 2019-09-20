using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using FluentValidation;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class CommendValidator : AbstractValidator<Command>
        {
            public CommendValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.StartDate).NotEmpty();
                RuleFor(x => x.EndDate).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Venue).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Activity activity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    StartDate = request.StartDate,
                    EndDate = request.EndDate,
                    City = request.City,
                    Venue = request.Venue
                };
                _context.Activities.Add(activity);
                bool success = await _context.SaveChangesAsync() > 0;
                if (success)
                {
                    return Unit.Value;
                }
                throw new Exception("Problem saving changes");
            }
        }
    }
}