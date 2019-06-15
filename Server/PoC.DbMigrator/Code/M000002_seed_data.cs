using FluentMigrator;

namespace PoC.DbMigrator.Code
{
    [Migration(000002)]
    public class M000002_seed_data : ForwardOnlyMigration
    {
        public override void Up()
        {
            Execute.EmbeddedScript("M000002_seed_data.sql");
        }
    }
}
