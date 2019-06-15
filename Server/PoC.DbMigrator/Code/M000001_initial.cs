using FluentMigrator;

namespace PoC.DbMigrator.Code
{
    [Migration(000001)]
    public class M000001_initial : ForwardOnlyMigration
    {
        public override void Up()
        {
            Execute.EmbeddedScript("M000001_initial.sql");
        }
    }
}
