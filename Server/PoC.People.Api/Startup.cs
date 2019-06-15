using CommonLib.Business.Core;
using CommonLib.Repo.Core;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PoC.Business.Builders;
using PoC.Data;

namespace PoC.People.Api
{
    public class Startup
    {
        private const string DevOrigin = "AllowDev";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("PoCDb");
            
            services.AddCors(options =>
            {
                options.AddPolicy(DevOrigin, builder => builder.WithOrigins("http://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
            services.Configure<MvcOptions>(options =>
                options.Filters.Add(new CorsAuthorizationFilterFactory(DevOrigin)));
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(
                    options => options.SerializerSettings.ReferenceLoopHandling =
                        Newtonsoft.Json.ReferenceLoopHandling.Ignore
                );
            services.AddDbContextPool<PoCDbContext>(options => { options.UseSqlServer(connectionString); });
            RegisterServices(services);
        }

        private void RegisterServices(IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<>), typeof(PoCRepository<>));
            services.AddScoped(typeof(ICriteria<>), typeof(Criteria<>));
            services.AddTransient<IModelBuilder<string, Data.Models.People>, PeopleBuilder>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors(DevOrigin);
            app.UseMvc();
        }
    }
}