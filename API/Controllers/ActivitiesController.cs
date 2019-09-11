using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using Domain;
using MediatR;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{activityId}")]
        public async Task<ActionResult<Activity>> Details(Guid activityId)
        {  
            return await _mediator.Send(new Details.Query{Id = activityId});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{activityId}")]
        public async Task<ActionResult<Unit>> Edit(Guid activityId, Edit.Command command)
        {
            command.Id = activityId;
            return await _mediator.Send(command);
        }

        [HttpDelete("{activityId}")]
        public async Task<ActionResult<Unit>> Delete(Guid activityId)
        {
            return await _mediator.Send(new Delete.Command{Id = activityId});
        }
    }
}